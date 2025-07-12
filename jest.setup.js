import '@testing-library/jest-dom';

// Polyfill for React Router’s use of TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;