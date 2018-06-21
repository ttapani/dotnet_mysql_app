import * as React from 'react';
import { Item } from '../../../store/item/types';
import { connect, Dispatch } from 'react-redux';
import { deleteItem, updateItem } from '../../../store/item/actions';

interface ItemRowProps {
    item: Item;
    updateItem: (item: Item) => any;
    deleteItem: (item: Item) => any;
}

interface ItemRowState {
    isEditing: boolean;
    newName: string;
}

type AllProps = ItemRowProps & typeof deleteItem;

class ItemRow extends React.Component<AllProps, ItemRowState> {
    constructor(props: AllProps) {
        super(props);
        this.state = { isEditing: false, newName: this.props.item.name };
    }

    onDelete = (event: any): void => {
        const { item } = this.props;
        event.preventDefault();
        this.props.deleteItem(item);
    }

    onEdit = (event: any): void => {
        event.preventDefault();
        this.setState({ isEditing: true });
    }

    onNameChanged = (event: any): void => {
        this.setState({ newName: event.target.value });
    }

    onSave = (event: any): void => {
        const { item } = this.props;
        item.name = this.state.newName;
        event.preventDefault();
        this.setState({ isEditing: false });
        this.props.updateItem(item);
    }

    onCancel = (event: any): void => {
        event.preventDefault();
        this.setState({ isEditing: false });
    }

    public render() {
        if (!this.state.isEditing) {
            return this.renderShow();
        } else {
            return this.renderEdit();
        }
    }

    private renderShow() {
        const { item: { name } } = this.props;
        return (
            <div>{name}
                <a href="items/#" onClick={this.onEdit}>Edit</a>
                <a href="items/#" onClick={this.onDelete}>Delete</a>
            </div>
        );
    }

    private renderEdit() {
        return (
            <div>
                <input type="text" name="itemName" defaultValue={this.state.newName} onChange={this.onNameChanged}/>
                <a href="items/#" onClick={this.onSave}>Save</a>
                <a href="items/#" onClick={this.onCancel}>Cancel</a>
            </div>
        );
    }
}

export default connect(undefined,
    (dispatch: Dispatch) => ({
        deleteItem: (item: Item) => dispatch(deleteItem(item)),
        updateItem: (item: Item) => dispatch(updateItem(item))})
)(ItemRow);
