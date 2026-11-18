# On Android, `@expo/ui`'s time pickers show no text input, though their props ask for one

`@expo/ui` 58.0.29, Expo SDK 58 (`expo` 58.0.26, React Native 0.88.1),
Android 17 emulator (x86_64, English (United States)), development build.
Android only: the app uses the Jetpack Compose `DateTimePicker`, which does
not run on iOS.

1. `npm install`, then `npx expo run:android`.
2. Press **Open the time picker dialog**. It opens the community
   `DateTimePicker` with `mode="time"` and `display="spinner"`. Press
   **Cancel**.
3. Press **Open the date picker dialog**. It opens the same picker with
   `mode="date"`. Press **Cancel**.
4. Scroll down to the two inline time pickers. The first is the community
   `DateTimePicker` with `mode="time"`, `display="spinner"` and
   `presentation="inline"`. The second is the Jetpack Compose
   `DateTimePicker` with `displayedComponents="hourAndMinute"` and
   `variant="input"`.

Expected: the three time pickers show Material 3's time input, with a field
for the hour and a field for the minutes. The Jetpack Compose
`DateTimePicker` also shows a button that switches between the input and
the dial. The community `DateTimePicker` documents that on Android
"`'spinner'` shows a text input". The Jetpack Compose `DateTimePicker`
documents `variant` and `showVariantToggle` ("Show a button to toggle
between variants on Android", `true` by default) with no exception for
`'hourAndMinute'`. Its `showTitle` and `showHeadline` docs say that they
have no effect with `'hourAndMinute'`.

Actual: the three time pickers show the dial, and none has a button that
switches to text input. The date dialog in step 3 shows a text field and a
button that switches to the calendar, so `display="spinner"` works for
dates.

`ExpoTimePicker` and `ExpoTimePickerDialogContent` in
`android/src/main/java/expo/modules/ui/DatePickerView.kt` always compose
Material 3's `TimePicker` and never its `TimeInput`, and neither reads
`variant` or `showVariantToggle`. `TimePickerDialogProps` has neither prop,
so the community `DateTimePicker` passes no variant to its time dialog.
