import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import { getLoans, returnLoan } from '../../store/loan/actions';
import { LoansState, Loan, LoanReturnRequest } from '../../store/loan/types';
import { Table, Grid, Row, Col } from 'react-bootstrap';

interface LoansPageProps {
    getLoans: () => any;
    returnLoan: (request: LoanReturnRequest) => any;
}

type AllProps = LoansPageProps & LoansState & typeof getLoans & RouteComponentProps<{}>;

class Loans extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
        this.renderLoansList = this.renderLoansList.bind(this);
        this.renderActiveLoanRow = this.renderActiveLoanRow.bind(this);
        this.renderReturnedLoanRow = this.renderReturnedLoanRow.bind(this);
    }

    public componentWillMount(): void {
        console.log(this.props);
        this.props.getLoans();
    }

    onReturn = (event: any): void => {
        const loanId = event.target.dataset.id;
        const now = Date();
        this.props.returnLoan({id: loanId, clientTime: now});
        console.log(event.target);
        console.log(loanId);
        console.log(event.target.dataset.id);
    }

    public render() {
        return (
        <Grid>
        <h1>Loans</h1>
        <Row>
        <Col md={12}>
            <h2>Active</h2>
            <Table striped={true} bordered={true} condensed={true} hover={true}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>User</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Return</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderLoansList()}
                </tbody>
            </Table>
        </Col>
        </Row>
        <Row>
        <Col md={12}>
            <h2>Returned</h2>
            <Table striped={true} bordered={true} condensed={true} hover={true}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>User</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Returned on</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderReturnedLoansList()}
                </tbody>
            </Table>
        </Col>
        </Row>
        </Grid>
        );
    }
    private renderLoansList() {
        const activeLoans = this.props.loans.filter(loan => loan.active === true);
        return (
            <>
                {activeLoans.map(loan => <tr key={loan.id}>{this.renderActiveLoanRow(loan)}</tr>)}
            </>
        );
    }
    private renderReturnedLoansList() {
        const returnedLoans = this.props.loans.filter(loan => loan.active === false);
        return (
            <>
                {returnedLoans.map(loan => <tr key={loan.id}>{this.renderReturnedLoanRow(loan)}</tr>)}
            </>
        );
    }
    private renderActiveLoanRow(loan: Loan) {
        return (
            <>
                <td>{loan.item.name}</td>
                <td>{loan.user}</td>
                {/* JavaScript Date-object parsing cannot be trusted cross-browser? */}
                <td>{new Date(loan.startDate).toLocaleDateString('fi-FI')}</td>
                <td>{new Date(loan.endDate).toLocaleDateString('fi-FI')}</td>
                <td><a onClick={this.onReturn} data-id={loan.id}>Return</a></td>
            </>
        );
    }

    private renderReturnedLoanRow(loan: Loan) {
        return (
            <>
                <td>{loan.item.name}</td>
                <td>{loan.user}</td>
                {/* JavaScript Date-object parsing cannot be trusted cross-browser? */}
                <td>{new Date(loan.startDate).toLocaleDateString('fi-FI')}</td>
                <td>{new Date(loan.endDate).toLocaleDateString('fi-FI')}</td>
                <td>{new Date(loan.returnDate).toLocaleDateString('fi-FI')}</td>
            </>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.loans,
    (dispatch: Dispatch) => ({
        getLoans: () => dispatch(getLoans()),
        returnLoan: (request: LoanReturnRequest) => dispatch(returnLoan(request)),
    })
)(Loans);
