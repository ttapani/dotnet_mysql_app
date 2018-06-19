import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FetchItemsState } from '../../store/item/types';
import { getItems } from '../../store/item/actions';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

type ItemsProps = FetchItemsState & typeof getItems & RouteComponentProps<{}>;

class Items extends React.Component<ItemsProps, {}> {
    constructor(props: ItemsProps) {
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

            <p>Trying to get some data from API with AJAX.</p>

            {this.renderItemsList()}

        </div>
        );
    }

    public renderItemsList() {
        return (
            <ul>
                {this.props.items.map(item => <li key={item.guid}>{item.name}</li>)}
            </ul>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.items,
    {getItems}
)(Items);
