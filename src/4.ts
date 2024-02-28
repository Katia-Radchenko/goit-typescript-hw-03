class Key {
    private signature: number;

    constructor() {
        this.signature = Math.trunc(Math.random() * 100000)
    }

    getSignature(): number {
        return this.signature;
    }
}

class Person {
    constructor(private key: Key) {
    }

    getKey(): Key {
        return this.key;
    }
}

abstract class House {
    public door: boolean = false;
    private tenants: Person[] = [];

    constructor(protected key: Key) {
    }

    comeIn(person: Person): void {
        if (!this.door) {
            return;
        }
        this.tenants.push(person);
    }

    abstract openDoor(key: Key): void;

    abstract closeDoor(): void;
}

class MyHouse extends House {
    // constructor(key: Key) {
    //     super(key);
    // }

    openDoor(key: Key): void {

        if (key.getSignature() !== this.key.getSignature()) {
            return;
        }

        this.door = true;
    }

    closeDoor(): void {
        if (!this.door) return;
        this.door = false;
    }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);
house.closeDoor();

const key2 = new Key();
const person2 = new Person(key2);

house.openDoor(person2.getKey());
house.comeIn(person2);
house.closeDoor();


const house2 = new MyHouse(key2);
house2.openDoor(person2.getKey());
house2.comeIn(person2);
house2.closeDoor();

export {};