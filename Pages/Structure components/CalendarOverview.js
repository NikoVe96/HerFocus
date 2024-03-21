import { Text, View } from "react-native";
import { Calendar } from 'react-native-calendars';


export const CalendarOverview = () => {

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>Calendar page</Text>
            <Calendar
                onDayPress={(day) => console.log('onDayPress', day)}
                onDayLongPress={(day) => console.log('onDayLongPress', day)}
                onMonthChange={(date) => console.log('onMonthChange', date)}>
            </Calendar>
        </View>
    );

}

export default CalendarOverview;