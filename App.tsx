import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { DateTimePicker as ComposeDateTimePicker, Host } from '@expo/ui/jetpack-compose';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';

// 9:05 PM.
const START = new Date(2026, 0, 1, 21, 5);

function hoursAndMinutes(date: Date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// Each picker asks for text input. The community DateTimePicker documents that on Android
// display="spinner" shows a text input. The Jetpack Compose DateTimePicker documents
// variant="input", and showVariantToggle, true by default, for a button that toggles between
// variants.
export default function App() {
  const [time, setTime] = useState(START);
  const [dialogMode, setDialogMode] = useState<'time' | 'date' | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Picked: {hoursAndMinutes(time)}</Text>
      <Button title="Open the time picker dialog" onPress={() => setDialogMode('time')} />
      <Button title="Open the date picker dialog" onPress={() => setDialogMode('date')} />
      {dialogMode && (
        <DateTimePicker
          mode={dialogMode}
          display="spinner"
          value={time}
          onValueChange={(_event, date) => {
            setDialogMode(null);
            setTime(date);
          }}
          onDismiss={() => setDialogMode(null)}
        />
      )}
      <Text>The community DateTimePicker, inline:</Text>
      <DateTimePicker
        mode="time"
        display="spinner"
        presentation="inline"
        value={time}
        onValueChange={(_event, date) => setTime(date)}
        style={styles.picker}
      />
      <Text>The Jetpack Compose DateTimePicker:</Text>
      <Host matchContents={{ vertical: true }} style={styles.picker}>
        <ComposeDateTimePicker
          displayedComponents="hourAndMinute"
          variant="input"
          initialDate={START.toISOString()}
          onDateSelected={(date) => {
            if (date !== null) {
              setTime(date);
            }
          }}
        />
      </Host>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 16, paddingVertical: 64 },
  // The native view takes its width from here, which a centered column would leave at zero.
  picker: { alignSelf: 'stretch' },
});
