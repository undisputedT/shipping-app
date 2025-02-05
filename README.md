# ShipEase - Shipping Management Application

A modern shipping management application built with React, TypeScript, and Vite. ShipEase provides an intuitive interface for booking and managing shipments with features like real-time price calculation and dynamic form validation.

## Features

- Multi-step booking form with progress tracking
- Real-time shipping price calculation
- Image upload for packages
- Form validation
- Responsive design
- Animated page transitions
- Dynamic shipping method selection based on shipment type

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shipease.git
cd shipease
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Required Dependencies

- `formik`: Form management
- `yup`: Form validation
- `framer-motion`: Animations
- `react-router-dom`: Routing
- `lucide-react`: Icons
- `tailwindcss`: Styling

## Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/
│   ├── BookingForm.tsx
│   ├── ShipmentDetails.tsx
│   ├── SenderDetails.tsx
│   ├── ReceiverDetails.tsx
│   └── SuccessPage.tsx
├── assets/
│   └── images/
└── ...
```

## Usage

1. Navigate to the landing page
2. Click "Book a Shipment"
3. Fill in shipment details:
   - Select shipment type (local/foreign)
   - Enter package details
   - Upload package images (optional)
4. Complete sender and receiver information
5. Review summary and submit

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
