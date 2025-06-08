export function convertToDDMMYYYY(dateString:string|undefined) 
{
    if(dateString == null || dateString == undefined){
        return "";
    }
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');       // 20 → "20"
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 3 → "04"
    const year = date.getFullYear();                            // 2002
  
    return `${day}/${month}/${year}`;
  }
  
  export function convertDDMMYYYtoAge(v:string | undefined){
    if(v == undefined){
        return 0;
    }
    const value = v

    const isValid = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
    
    if (!isValid) {
      return 0;
    }
    const [day, month, year] = value.split('/').map(Number);
    const dob = new Date(year, month - 1, day);

    // Check for valid date object
    if (
      dob.getDate() !== day ||
      dob.getMonth() !== month - 1 ||
      dob.getFullYear() !== year
    ) {
      return 0
    }

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age
  }