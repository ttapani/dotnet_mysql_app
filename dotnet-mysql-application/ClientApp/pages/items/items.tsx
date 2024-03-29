import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FetchItemsState, Item } from '../../store/item/types';
import { getItems, addItem, deleteItem } from '../../store/item/actions';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import ItemRow from './containers/loanableItemRow';

interface ItemsProps {
    getItems: () => any;
}

type Allprops = ItemsProps & FetchItemsState & typeof getItems & RouteComponentProps<{}>;

class Items extends React.Component<Allprops, {}> {
    constructor(props: Allprops) {
        super(props);
    }

    public componentWillMount(): void {
        console.log(this.props);
        this.props.getItems();
    }

    public render() {
        return (
        <div>
            <h1>Items</h1>

            <a onClick={() => this.props.getItems()}>Get Items</a>
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
)(Items);
