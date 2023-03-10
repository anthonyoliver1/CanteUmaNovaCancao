import React, { useRef } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Container, FilterContainer, TextButton, Wrapper } from '../../style/FilterStyle';

export default function Filter({ listHandler, filterOrder }) {
    const flatListRef = useRef(FlatList);

    const renderItem = ({ item, separators, index }) => {
        const pressed = () => {
            listHandler(item);

            flatListRef.current.scrollToIndex({
                animated: true,
                index: index,
                viewOffset: 1,
                viewPosition: 0.5
            });
        }

        return <FilterContainer>
            <TouchableOpacity
                key={item.title}
                onPress={() => pressed()}
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
    }

    return (
        <Container>
            <FlatList
                ref={flatListRef}
                data={filterOrder}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => item + index}
                showsHorizontalScrollIndicator={false}
            />
        </Container>
    );
}
