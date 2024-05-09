// pages/documents/index.tsx
import DocumentsLayout from '../lib/layouts/documents';
import BaseLayout from '../lib/layouts/base';

const DocumentsPage = () => {
  return (
    <BaseLayout>
      <DocumentsLayout>
        <div>Additional info about the application.</div>
      </DocumentsLayout>
    </BaseLayout>
  );
};

export default DocumentsPage;

