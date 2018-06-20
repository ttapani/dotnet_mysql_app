import * as React from 'react';
import { Item } from '../../../store/item/types';
import { connect, Dispatch } from 'react-redux';
import { deleteItem } from '../../../store/item/actions';

interface ItemRowProps {
    item: Item;
    removeItem: (item: Item) => any;
}

type AllProps = ItemRowProps & typeof deleteItem;

class ItemRow extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
    }

    onDelete = (event: any): void => {
        const { item, removeItem } = this.props;
        event.preventDefault();
        removeItem(item);
    }

    public render() {
        const { item: { name } } = this.props;
        return (
            <div>{name}<a href="items/#" onClick={this.onDelete}>Delete</a></div>
        );
    }
}

export default connect(undefined,
    (dispatch: Dispatch) => ({
        removeItem: (item: Item) => dispatch(deleteItem(item))})
)(ItemRow);
