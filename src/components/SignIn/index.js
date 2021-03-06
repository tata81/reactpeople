import React from 'react';
import { connect } from 'react-redux';
import { Container } from './styles';

import User from './user';
import GitHubAuth from './github';

class SignIn extends React.Component {
  componentDidMount() {
    this.checkAuthHandler();
  }

  checkAuthHandler = () => {
    const auth = window.localStorage.getItem('@reactpeople:auth');

    if(auth)
      this.props.setAuth(JSON.parse(auth));
  }

  render() {
    return (
      <Container>
        {
          this.props.auth.user
          ? <User user={this.props.auth.user} unsetAuth={this.props.unsetAuth} />
          : <GitHubAuth />
        }
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  setAuth: data => dispatch({ type: 'SET_AUTH', payload: data }),
  unsetAuth: () => dispatch({ type: 'UNSET_AUTH' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
