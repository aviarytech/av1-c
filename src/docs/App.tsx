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
import { HeaderPage } from "./pages/components/HeaderPage";
import { TitlePage } from "./pages/components/TitlePage";
import { FormFieldPage } from "./pages/components/FormFieldPage";
import { LabelPage } from "./pages/components/LabelPage";
import { CodePage } from "./pages/components/CodePage";
import { AccordionPage } from "./pages/components/AccordionPage";
import { CodeEditorPage } from "./pages/components/CodeEditorPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { Toaster } from 'react-hot-toast';
import { SchemaEditorPage } from "./pages/features/SchemaEditorPage";
import { BadgePage } from "./pages/components/BadgePage";
import { ThemeProvider, useTheme } from "../ThemeProvider";
import { TradingCardPage } from "./pages/components/TradingCardPage";

// Wrapper component that uses the theme context
const AppContent = () => {
  const { resolvedTheme } = useTheme();
  const [currentPage, setCurrentPage] = React.useState(() => {
    // First try to get page from URL hash
    const hashPage = window.location.hash.slice(1);
    if (hashPage) return hashPage;
    
    // Then try localStorage
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) return savedPage;
    
    // Default to a starting page
    return 'getting-started';
  });

  // Update hash and localStorage when page changes
  React.useEffect(() => {
    window.location.hash = currentPage;
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Handle hash changes from browser back/forward
  React.useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.slice(1);
      if (page) {
        setCurrentPage(page);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "getting-started":
        return <GettingStartedPage />;
      case "features":
        return <FeaturesPage />;
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
      case "accordion":
        return <AccordionPage />;
      case "code-editor":
        return <CodeEditorPage />;
      case "schema-editor":
        return <SchemaEditorPage />;
      case "badge":
        return <BadgePage />;
      case "trading-card":
        return <TradingCardPage />;
      default:
        return <GettingStartedPage />;
    }
  };

  const { theme, colorTheme } = useTheme();
      
  return (
    <div className="min-h-screen">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: resolvedTheme === 'dark' ? '#1f2937' : '#ffffff',
            color: resolvedTheme === 'dark' ? '#fff' : '#000',
            border: '1px solid',
            borderColor: resolvedTheme === 'dark' ? '#374151' : '#e5e7eb',
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
        }}
      />
      <Header>
        <HeaderContent>
          <Title level={3} className={colorTheme ? `text-${colorTheme}-primary` : 'text-blue-600 dark:text-blue-400'}>AV1-C</Title>
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

// Main App component with ThemeProvider
export const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <AppContent />
    </ThemeProvider>
  );
};