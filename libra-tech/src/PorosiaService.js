export class PorosiaService {
    constructor() {
      this.baseUrl = 'http://localhost:5170/api/';
    }
  
    async getAllLibrat() {
      const response = await fetch(this.baseUrl + 'Libri');
      const data = await response.json();
      return data;
    }
  
    async getAllMjetet() {
      const response = await fetch(this.baseUrl + 'MjeteShkollore');
      const data = await response.json();
      return data;
    }
  
    async createPorosia(porosia) {
      const response = await fetch(this.baseUrl + 'Porosia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(porosia)
      });
      return response.json();
    }
  }
  