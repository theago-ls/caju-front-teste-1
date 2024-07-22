import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Router from "~/router";
import { ConfirmationDialog, Header } from "./components";
import { ModalProvider } from "./contexts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <ModalProvider>
        <Router />
        <ConfirmationDialog />
        <Toaster />
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
