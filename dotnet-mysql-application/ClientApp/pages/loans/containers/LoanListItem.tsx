import * as React from 'react';
import { Loan } from '../../../store/loan/types';

interface LoanListItemProps {
    loan: Loan;
    // TODO: Actions to return, edit loans
}

type AllProps = LoanListItemProps;

class LoanListItem extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
    }

    public render() {
        return this.renderListItem();
    }

    private renderListItem() {
        const { loan } = this.props;
        return (
            <li>
                {JSON.stringify(loan)}
            </li>
        );
    }
}

export default LoanListItem;
