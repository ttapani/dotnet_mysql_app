import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FetchItemsState, Item } from '../../store/item/types';
import { getItems, addItem, deleteItem } from '../../store/item/actions';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import ItemRow from '../manage_items/containers/editableItemRow';

interface ManageItemsProps {
    getItems: () => any;
    addItem: (item: any) => any;
}

type Allprops = ManageItemsProps & FetchItemsState & typeof getItems & RouteComponentProps<{}>;

class ManageItems extends React.Component<Allprops, {}> {
    constructor(props: Allprops) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentWillMount(): void {
        console.log(this.props);
        this.props.getItems();
    }

    public handleSubmit(event: any): void {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newItem = {
            name: formData.get('name'),
        };
        this.props.addItem(newItem);
    }

    public render() {
        return (
        <div>
            <h1>Manage Items</h1>

            <a onClick={() => this.props.getItems()}>Get Items</a>
            <div>
            <form name="addItemForm" onSubmit={this.handleSubmit}>
            <fieldset disabled={this.props.isLoading ? true : false}>
                    <label htmlFor="name">Item name</label>
                    <input id="name" name="name" type="text" required={true}/>
                    <button>Submit</button>
            </fieldset>
            </form>
            </div>
            {this.renderItemsList()}
        </div>
        );
    }

    public renderItemsList() {
        return (
            <ul>
                {this.props.items.map(item => <li key={item.id}><ItemRow item={item}/></li>)}
            </ul>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.items,
    (dispatch: Dispatch) => ({
        getItems: () => dispatch(getItems()),
        addItem: (item: Item) => dispatch(addItem(item))})
)(ManageItems);
