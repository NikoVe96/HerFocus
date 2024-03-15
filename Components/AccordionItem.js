import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function AccordionItem({ children, title, icon }) {
    const [expanded, setExpanded] = useState(false);

    function toggleItem() {
        setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={icon} size={20} style={{ marginRight: 10 }} />
                    <Text style={styles.accordTitle}>{title}</Text>
                </View>
                <FontAwesomeIcon icon={faCaretDown} />
            </TouchableOpacity>
            {expanded && body}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    accordContainer: {
        paddingBottom: 4,
        marginHorizontal: 0
    },
    accordHeader: {
        padding: 12,
        backgroundColor: 'lightblue',
        color: '#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    accordTitle: {
        fontSize: 20,
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