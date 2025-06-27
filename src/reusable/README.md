# Reusable Components

This folder contains reusable UI components for the Solvista application.

## Button Component

A flexible button component with multiple variants, sizes, and states.

### Props

- `variant`: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'link' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `disabled`: boolean (default: false)
- `loading`: boolean (default: false)
- `icon`: React element
- `iconPosition`: 'left' | 'right' (default: 'left')
- `fullWidth`: boolean (default: false)
- `type`: 'button' | 'submit' | 'reset' (default: 'button')
- `onClick`: function
- `className`: string
- `children`: React node (required)

### Usage Examples

```jsx
import { Button } from '@/reusable';
import { IoAdd, IoTrash } from 'react-icons/io5';

// Basic usage
<Button onClick={handleClick}>Click me</Button>

// With variants
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>

// With sizes
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>

// With icons
<Button icon={<IoAdd />}>Add Item</Button>
<Button icon={<IoTrash />} iconPosition="right">Delete</Button>

// Loading state
<Button loading>Loading...</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Disabled state
<Button disabled>Disabled Button</Button>
```

## Modal Component

A comprehensive modal component with accessibility features, animations, and flexible content.

### Props

- `open`: boolean (default: false)
- `onClose`: function (required)
- `title`: string
- `children`: React node (required)
- `size`: 'small' | 'medium' | 'large' | 'full' (default: 'medium')
- `showCloseButton`: boolean (default: true)
- `closeOnOverlayClick`: boolean (default: true)
- `closeOnEscape`: boolean (default: true)
- `className`: string
- `footer`: React node

### Usage Examples

```jsx
import { Modal, Button } from '@/reusable';
import { useState } from 'react';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="medium"
        footer={
          <div>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle save
              setIsModalOpen(false);
            }}>
              Save
            </Button>
          </div>
        }
      >
        <p>This is the modal content. You can put any React components here.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Modal>
    </>
  );
}

// Different sizes
<Modal size="small" title="Small Modal">Content</Modal>
<Modal size="medium" title="Medium Modal">Content</Modal>
<Modal size="large" title="Large Modal">Content</Modal>
<Modal size="full" title="Full Screen Modal">Content</Modal>

// Without title
<Modal open={isOpen} onClose={handleClose}>
  <p>Modal without title</p>
</Modal>

// Without close button
<Modal 
  open={isOpen} 
  onClose={handleClose}
  showCloseButton={false}
  title="No Close Button"
>
  <p>This modal doesn't have a close button</p>
</Modal>

// Custom footer
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Custom Footer"
  footer={
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
      <Button variant="ghost">Back</Button>
      <Button>Next</Button>
    </div>
  }
>
  <p>Modal with custom footer layout</p>
</Modal>
```

## Features

### Button Features
- ✅ Multiple variants (primary, secondary, outline, danger, ghost, link)
- ✅ Different sizes (small, medium, large)
- ✅ Loading state with spinner
- ✅ Icon support (left/right positioning)
- ✅ Full width option
- ✅ Disabled state
- ✅ Proper accessibility
- ✅ Hover and active states
- ✅ Responsive design

### Modal Features
- ✅ Multiple sizes (small, medium, large, full)
- ✅ Optional title and close button
- ✅ Custom footer support
- ✅ Close on overlay click
- ✅ Close on Escape key
- ✅ Body scroll lock when open
- ✅ Smooth animations
- ✅ Portal rendering (renders outside component tree)
- ✅ Focus management
- ✅ Proper accessibility (ARIA attributes)
- ✅ Responsive design
- ✅ Custom scrollbar styling
- ✅ High contrast mode support
- ✅ Reduced motion support

## Importing

You can import components individually or use the index file:

```jsx
// Individual imports
import Button from '@/reusable/Button';
import Modal from '@/reusable/Modal';

// Or using the index file
import { Button, Modal } from '@/reusable';
``` 