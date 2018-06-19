import * as React from 'react';

interface ItemProps {
    name: string;
}

const Item: React.SFC<ItemProps> = (props) => {
    return <div>{props.name}</div>;
};

export default Item;
