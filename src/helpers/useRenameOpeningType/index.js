function useRenameOpeningType(typeOpen){
  // list dari BE vvvvvvvvvv
  // New Location (newLocation), 
  // New ATM (addMachine), 
  // Reopen (reopen), 
  // Replace (replace), 
  // Renewal (renewal), 
  // Termin (termin)
  // RETURN
  switch (typeOpen) {
  case "New Location":
    return "newLocation";
  case "New ATM":
    return "addMachine";
  case "Reopen":
    return "reopen";
  case "Replace":
    return "replace";
  case "Renewal":
    return "renewal";
  case "Termin":
    return "termin";
  default:
    return "newLocation";
  }
}

export default useRenameOpeningType;