import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, concat } from "@apollo/client";
import { ReactElement } from "react";

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const auth = localStorage.getItem('@auth')? JSON.parse(localStorage.getItem('@auth')!) : null;
    operation.setContext({
      headers: {
        authorization: auth ? `Bearer ${auth.token}` : "",
      },
    });
    return forward(operation);
});

const httpLink = new HttpLink({ uri: 'http://localhost/graphql' });

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
});


type Props = {
    children: ReactElement
}

const ABApolloClient = ({children}: Props) => {
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
}

export default ABApolloClient;