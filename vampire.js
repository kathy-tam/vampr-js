class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let current = this;
    while(current.creator) {
      count++;
      current = current.creator;
    }

    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
<<<<<<< HEAD
=======
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if(this.name === name) return this;
    for(const descendent of this.offspring) {
      const match = descendent.vampireWithName(name);
      if(match) return match;
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for(const descendent of this.offspring) {
      count++;
      count += descendent.totalDescendents;
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];
    for(const descendent of this.offspring) {
      if(descendent.yearConverted > 1980) millenials.push(descendent);
      millenials = millenials.concat(descendent.allMillennialVampires);
    }
    return millenials;
>>>>>>> traversal
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // Root vampire
    if (!vampire.creator) {
      return vampire;
    } else if (!this.creator) {
      return this;
    }
    // Direct Ancestor
    if (vampire.offspring.includes(this)) {
      return vampire;
    } else if (this.offspring.includes(vampire)) {
      return this;
    }
    // Same vampire
    if (vampire === this) {
      return this;
    }
    // Common ancestor
    // Get list of vampire's ancestors, and then check which of this' ancestors is in the list 
    let ancestors = [];
    let current = vampire;
    while(current.creator) {
      ancestors.push(current.creator);
      current = current.creator;
    }
    current = this.creator;
    while(!ancestors.includes(current)) {
      current = current.creator;
    }
    return current;
  }
}

module.exports = Vampire;

