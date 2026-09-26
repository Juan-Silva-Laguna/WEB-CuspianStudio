import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/infrastructure/graphql/apolloClient";
import { router } from "./router/routes";

/**
 * Composition root: Apollo client + router.
 * The landing scroll/video providers are scoped inside LandingLayout
 * so they only run on the "/" route.
 */
function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
