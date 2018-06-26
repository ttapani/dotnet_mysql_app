import * as React from 'react';
import { Item } from '../../../store/item/types';
import { connect, Dispatch } from 'react-redux';
import { addLoan } from '../../../store/loan/actions';

interface LoanableItemRowProps {
    item: Item;
    requestLoan: (request: string) => any;
}

type AllProps = LoanableItemRowProps;

class LoanableItemRow extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
        this.state = { isAvailable: this.props.item.isAvailable };
    }

    onBorrow = (event: any): void => {
        const { item } = this.props;
        event.preventDefault();
        console.log('loan clicked');
        this.props.requestLoan(this.props.item.id);
    }

    public render() {
        if (this.props.item.isAvailable) {
            return this.renderAvailable();
        } else {
            return this.renderUnavailable();
        }
    }

    private renderAvailable() {
        const { item: { name } } = this.props;
        return (
            <div>{name}
                <a href="items/#" onClick={this.onBorrow}>Loan</a>
            </div>
        );
    }

    private renderUnavailable() {
        const { item: { name } } = this.props;
        return (
            <div>
                {name}-Unavailable
            </div>
        );
    }
}

export default connect(undefined,
    (dispatch: Dispatch) => ({
        requestLoan: (id: string) => dispatch(addLoan(id)),
    })
)(LoanableItemRow);
