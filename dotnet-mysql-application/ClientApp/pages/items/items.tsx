import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FetchItemsState } from '../../store/item/types';
import { getItems } from '../../store/item/actions';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import Item from './components/item';

interface ItemsProps {
    getItems: () => any;
}

type Allprops = ItemsProps & FetchItemsState & typeof getItems & RouteComponentProps<{}>;

class Items extends React.Component<Allprops, {}> {
    constructor(props: Allprops) {
        super(props);
    }

    public componentWillMount(): void {
        this.props.getItems();
    }

    public render() {
        return (
        <div>
            <h1>Items</h1>

            <p>Trying to get some data from API with AJAX.</p>
            <a onClick={() => this.props.getItems()}>Get Items</a>

            {this.renderItemsList()}

        </div>
        );
    }

    public renderItemsList() {
        return (
            <ul>
                {this.props.items.map(item => <li key={item.id}><Item name={item.name}/></li>)}
            </ul>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.items,
    (dispatch: Dispatch) => ({getItems: () => dispatch(getItems())})
)(Items);
