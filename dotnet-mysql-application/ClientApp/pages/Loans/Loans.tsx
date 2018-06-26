import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import { getLoans } from '../../store/loan/actions';
import { LoansState } from '../../store/loan/types';

interface LoansPageProps {
    getLoans: () => any;
}

type AllProps = LoansPageProps & LoansState & typeof getLoans & RouteComponentProps<{}>;

class Loans extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
    }

    public componentWillMount(): void {
        console.log(this.props);
        this.props.getLoans();
    }

    public render() {
        return (
        <div>
            <h1>Loans</h1>

            {this.renderLoansList()}

        </div>
        );
    }

    private renderLoansList() {
        return (
            <ul>
                {this.props.loans.map(loan => <li key={loan.id}>{JSON.stringify(loan)}</li>)}
            </ul>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.loans,
    (dispatch: Dispatch) => ({
        getLoans: () => dispatch(getLoans()),
    })
)(Loans);
