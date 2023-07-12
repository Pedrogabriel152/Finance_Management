import { ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const updateLink = (newUrl: any, auth: any, client: ApolloClient<object>) => {
    const httpLink = createHttpLink({ uri: newUrl });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
            ...headers,
            'Authorization': `Bearer ${auth.token}`,
            },
        };
    });

    const link = authLink.concat(httpLink);
    client.setLink(link);
    return client;
}

export { updateLink };