import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Container, TextButton, Wrapper } from '../../style/FilterStyle';

export default function Filter({ listHandler, filterOrder }) {

    const renderItem = ({ item, separators }) => (
        <TouchableOpacity
            key={item.title}
            onPress={() => listHandler(item)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
            activeOpacity={0.4}
        >
            <Wrapper>
                <TextButton>
                    {item.title}
                </TextButton>
            </Wrapper>
        </TouchableOpacity>
    )

    return (
        <Container>
            <FlatList
                data={filterOrder}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => item + index}
                showsHorizontalScrollIndicator={false}
            />
        </Container>
    );
}
