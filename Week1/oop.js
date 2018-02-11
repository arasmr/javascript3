class Movie {
    constructor(title, director) {
        // add your code here
        this.title = title;
        this.director = director;
        this.stars = [];
        this.writers = [];
        this.ratings = [];
        this.years = [];

    }

    getTitle() {
        // add your code here
        return this.title;

    }

    getDirector() {
        // add your code here
        return this.director;
    }

    addStar(star) {
        // add your code here
        this.stars.push(star);
        return this;
    }

    getStars() {
        // add your code here
        return this.stars;
    }

    addWriter(writer) {
        // add your code here
        this.writers.push(writer);
        return this;
    }

    getWriters() {
        // add your code here
        return this.writers;
    }

    addRating(rating) {
        // add your code here
        this.ratings.push(rating);
        return this;
    }

    getAverageRating() {
        // add your code here
        return this.ratings;
    }

    addYear(year) {
        this.years.push(year);
        return this;
    }

    getYear() {
        return this.years;
    }
    // ... Add yours :-) Look to IMDB for inspiration
}

class StaffMember {
    constructor(name, role, dateOfBirth) {
        // add your code here
        this.name = name;
        this.role = role;
        this.age = dateOfBirth;
        this.movies = [];

    }

    addMovie(movie) {
        // add your code here
        this.movies.push(movie);
        return this;

    }

    getName() {
        // add your code here
        return this.name;
    }

    getRole() {
        // add your code here
        return this.role;
    }

    getAge() {
        // add your code here
        return this.age;
    }
}

// Pick your favorite movie from http://www.imdb.com/

const theShawshankRedemption = new Movie("The Shawshank Redemption","Frank Darabont");

const firstActor = new StaffMember("Morgan Freeman", "Ellis Boyd 'Red' Redding", "1 June 1937");
const secondActor = new StaffMember("Tim Robbins", "Andy Dufresne", "16 October 1958");
const thirdActor = new StaffMember("Bob Gunton", "Warden Norton", "15 November 1945");

theShawshankRedemption.addStar(firstActor);
theShawshankRedemption.addStar(secondActor);
theShawshankRedemption.addStar(thirdActor);

theShawshankRedemption.addWriter("Stephen King");
theShawshankRedemption.addWriter("Frank Darabont");

theShawshankRedemption.addRating("9.3");

theShawshankRedemption.addYear(1994);

firstActor.addMovie("War of the Worlds");
firstActor.addMovie("The Secret Life of Words");
firstActor.addMovie("Zathura: A Space Adventure");

secondActor.addMovie("Now You See Me");
secondActor.addMovie("Last Vegas");
secondActor.addMovie("Wanted");

thirdActor.addMovie("Mountain Top");
thirdActor.addMovie("Kill the Irishman");
thirdActor.addMovie("The Lincoln Lawyer");

// create and add more staff members

// Make sure that the following actions work.

console.log(theShawshankRedemption.getStars().map(actor => `${actor.getName()} ${actor.getAge()}`));
const director = theShawshankRedemption.getDirector();
// console.log(`Director: ${director.getName()}`);
console.log("Director: "+ director);