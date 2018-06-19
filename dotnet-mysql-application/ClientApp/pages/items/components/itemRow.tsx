import * as React from 'react';

interface ItemRowProps {
    name: string;
}

const ItemRow: React.SFC<ItemRowProps> = (props) => {
    return <div>{props.name}</div>;
};

export default ItemRow;
