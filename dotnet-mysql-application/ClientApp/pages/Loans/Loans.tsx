import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import { getLoans } from '../../store/loan/actions';
import { LoansState, Loan } from '../../store/loan/types';
import LoanListItem from './containers/LoanListItem';
import { Table, Grid, Row, Col } from 'react-bootstrap';

interface LoansPageProps {
    getLoans: () => any;
}

type AllProps = LoansPageProps & LoansState & typeof getLoans & RouteComponentProps<{}>;

class Loans extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
        this.renderLoansList = this.renderLoansList.bind(this);
        this.renderLoanRow = this.renderLoanRow.bind(this);
    }

    public componentWillMount(): void {
        console.log(this.props);
        this.props.getLoans();
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
        return (
            <>
                {this.props.loans.map(loan => <tr key={loan.id}>{this.renderLoanRow(loan)}</tr>)}
            </>
        );
    }
    private renderReturnedLoansList() {
        return (
            <>
                {this.props.loans.map(loan => <tr key={loan.id}>{this.renderLoanRow(loan)}</tr>)}
            </>
        );
    }
    private renderLoanRow(loan: Loan) {
        return (
            <>
                <td>{loan.item.name}</td>
                <td>{loan.user}</td>
                {/* JavaScript Date-object parsing cannot be trusted cross-browser? */}
                <td>{new Date(loan.startDate).toLocaleDateString('fi-FI')}</td>
                <td>{new Date(loan.endDate).toLocaleDateString('fi-FI')}</td>
                <td>Return button here</td>
            </>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.loans,
    (dispatch: Dispatch) => ({
        getLoans: () => dispatch(getLoans()),
    })
)(Loans);
