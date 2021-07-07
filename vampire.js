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

