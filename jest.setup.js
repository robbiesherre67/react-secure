// 1) DOM assertions
import '@testing-library/jest-dom';

// 2) Polyfill fetch for any code that calls global.fetch()
import 'whatwg-fetch';

// 3) Polyfill TextEncoder/TextDecoder for React Router (you already had this)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;