import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Container, FilterContainer, TextButton, Wrapper } from '../../style/FilterStyle';

export default function Filter({ listHandler, filterOrder }) {

    const renderItem = ({ item, separators }) => (
        <FilterContainer>
            <TouchableOpacity
                key={item.title}
                onPress={() => listHandler(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
                activeOpacity={0.4}
            >
                <Wrapper selected={item.selected}>
                    <TextButton selected={item.selected}>
                        {item.title}
                    </TextButton>
                </Wrapper>
            </TouchableOpacity>
        </FilterContainer>
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
