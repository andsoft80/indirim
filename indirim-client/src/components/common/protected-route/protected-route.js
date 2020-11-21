import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector} from "react-redux";

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const { layout: Layout, component: Component, ...rest } = props;
  
  console.info(`ProtectedRoute ${Component.name} ${Layout.name} ${isAuthenticated}`);
  
  return (
	<Route
	  {...rest}
	  render={
	    matchProps => {
	      if(isAuthenticated) {
	        return (
			  <Layout>
				<Component {...matchProps}/>
			  </Layout>
			)
		  } else {
			console.info(`ProtectedRoute redirected to /signIn`);
			return (<Redirect to='/signIn'/>)
		  }
		}
	  }
	/>
  );
}

export default ProtectedRoute;
