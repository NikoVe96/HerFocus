import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@react-navigation/native';

function AccordionItem({ children, title, icon, emoji, titleStyle, emojiStyle, toggleStyle, time }) {
    const [expanded, setExpanded] = useState(false);
    const { colors } = useTheme();

    function toggleItem() {
        setExpanded(!expanded);
    }



    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {icon !== null ?
                        <FontAwesomeIcon icon={icon} size={20} color={colors.text} style={{ marginRight: 10 }} />
                        : <Text style={[emojiStyle, { fontSize: 22, marginRight: 10 }]}>{emoji}</Text>
                    }
                    {time == null ?
                        <Text style={[styles.accordTitle, titleStyle,]}>{title}</Text>
                        : <View>
                            <Text style={[styles.accordTitle, titleStyle,]}>{title}</Text>
                            <Text style={{ fontSize: 14 }}>{time}</Text>
                        </View>}
                </View>
                <FontAwesomeIcon icon={faCaretDown} color={colors.text} />
            </TouchableOpacity>
            {expanded && body}
        </View>
    );
}

const styles = StyleSheet.create({
    accordContainer: {
        paddingBottom: 4,
        width: '100%',
    },
    accordHeader: {
        padding: 12,
        color: '#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    accordTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    accordBody: {
        padding: 12
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    }
});

export default AccordionItem;