import * as React from "react";
import { Container } from "../components/layout/Container";
import { Header, HeaderContent } from "../components/header/Header";
import { Title } from "../components/typography/Title";
import { Navigation } from "./components/Navigation";
import { GettingStartedPage } from "./pages/GettingStartedPage";
import { ButtonPage } from "./pages/components/ButtonPage";
import { CardPage } from "./pages/components/CardPage";
import { DropdownPage } from "./pages/components/DropdownPage";
import { InputPage } from "./pages/components/InputPage";
import { DialogPage } from "./pages/components/DialogPage";
import { TablePage } from "./pages/components/TablePage";
import { ToastPage } from "./pages/components/ToastPage";
import { TooltipPage } from "./pages/components/TooltipPage";
import { SelectPage } from "./pages/components/SelectPage";
import { CheckboxPage } from "./pages/components/CheckboxPage";
import { SkeletonPage } from "./pages/components/SkeletonPage";
import { ThemeToggle } from "./components/ThemeToggle";
import { Github } from "lucide-react";
import { Button } from "../components/button/Button";
import { ErrorStatePage } from "./pages/components/ErrorStatePage";
import { BreadcrumbPage } from "./pages/components/BreadcrumbPage";
import { ContainerPage } from "./pages/layout/ContainerPage";
import { NavMenuPage } from "./pages/components/NavMenuPage";
import { User, Settings, ChevronDown } from "lucide-react";
import { HeaderPage } from "./pages/components/HeaderPage";
import { TitlePage } from "./pages/components/TitlePage";
import { Input } from "../components/input/Input";
import { FormFieldPage } from "./pages/components/FormFieldPage";
import { LabelPage } from "./pages/components/LabelPage";
import { CodePage } from "./pages/components/CodePage";

export const App = () => {
  const [currentPage, setCurrentPage] = React.useState("getting-started");

  const renderPage = () => {
    switch (currentPage) {
      case "getting-started":
        return <GettingStartedPage />;
      case "button":
        return <ButtonPage />;
      case "card":
        return <CardPage />;
      case "dropdown":
        return <DropdownPage />;
      case "input":
        return <InputPage />;
      case "dialog":
        return <DialogPage />;
      case "table":
        return <TablePage />;
      case "toast":
        return <ToastPage />;
      case "tooltip":
        return <TooltipPage />;
      case "select":
        return <SelectPage />;
      case "checkbox":
        return <CheckboxPage />;
      case "skeleton":
        return <SkeletonPage />;
      case "error-state":
        return <ErrorStatePage />;
      case "breadcrumb":
        return <BreadcrumbPage />;
      case "container":
        return <ContainerPage />;
      case "nav-menu":
        return <NavMenuPage />;
      case "header":
        return <HeaderPage />;
      case "title":
        return <TitlePage />;
      case "form-field":
        return <FormFieldPage />;
      case "label":
        return <LabelPage />;
      case "code":
        return <CodePage />;
      default:
        return <GettingStartedPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header>
        <HeaderContent>
          <Title level={3} className="text-blue-400">AV1 Components</Title>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <a
                href="https://github.com/aviarytech/av1-c"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </HeaderContent>
      </Header>
      
      <Container className="py-8">
        <div className="grid grid-cols-12 gap-8">
          <aside className="col-span-3">
            <Navigation onNavigate={setCurrentPage} currentPage={currentPage} />
          </aside>
          <main className="col-span-9">
            {renderPage()}
          </main>
        </div>
      </Container>
    </div>
  );
}; 