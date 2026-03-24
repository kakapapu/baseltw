
export interface RegistryBook {
  id: string;
  year: number;                 
  name: string;                 
  currentEntryNumber: number;   
}


export interface GraduationDecision {
  id: string;
  registryBookId: string;       
  decisionNumber: string;       
  issueDate: string;            
  summary: string;              
  lookupCount: number;          
}


export interface FormField {
  id: string;
  name: string;                 
  dataType: "String" | "Number" | "Date";  
}


export interface Diploma {
  id: string;
  registryBookId: string;       
  decisionId: string;           
  entryNumber: number;          
  diplomaNumber: string;        
  studentId: string;            
  fullName: string;             
  dateOfBirth: string;          
  extraFields: Record<string, string | number>;  
}
