describe('Auth flows', () => {
    const apiUrl = 'http://localhost:8000';
  
    beforeEach(() => {
      // optionally reset backend state via an endpoint
      // cy.request('POST', `${apiUrl}/test/reset.php`);
    });
  
    it('lets a user register then log in', () => {
      // 1) Register
      cy.visit('/register');
      cy.get('input[name="username"]').type('e2e_user');
      cy.get('input[name="password"]').type('E2Epass123!');
      cy.contains('button', 'Sign Up').click();
  
      // 2) Redirected to login
      cy.url().should('include', '/login');
  
      // 3) Log in
      cy.get('input[name="username"]').type('e2e_user');
      cy.get('input[name="password"]').type('E2Epass123!');
      cy.contains('button', 'Log In').click();
  
      // 4) Land on dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('h1', /dashboard/i);
    });
  });
  