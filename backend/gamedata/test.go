package main

import "fmt" // format...
import "os"
import "bufio" // ?

func someFunc(age int) string {
	if age < 50 {
		return "Young!"
	} else {
		return "Old!"
	}
}

func main() {
	var q int
	x := 3 		// Declares a variable with inferred type.

	q = x		
	fmt.Println(q)

	stuff := []string{"first", "second", "third"}		// a list (slice) of strings...
	fmt.PrintLn(stuff)		// prints the list..

	// FOR LOOP i is the index of val?
	for i, val := range(stuff) {
		fmt.Println(val, "is at position", i)
	}

	// a map where keys are string and values are int.
	ages := map[string]int {
		"Pat": 53,
		"Bob": 22,
		"Jane":53,
	}

	fmt.Println(ages["Bob"])

	v, ok := ages["NOT A NAME"]	// need to do this to know if key exists...
	if ok {
		fmt.Println("Age is", v)
	} else {
		fmt.Println("Person is not in map.")
	}

	fmt.Println(ages["NOT A NAME"]) // will print out 0...

}

func readFirstLine(filename string) (string, error) {
	f, err := os.Open(filename)	// returns file handle and error...
	if err != nil {
		// then there's an error...
		return "", err
	}

	defer f.Close() // will run at end of func.
	
	// file opened without error...
	scanner := bufio.NewScanner(f)
	if scanner.Scan() {
		return scanner.Text(), nil
	} else {
		return "", errors.New("Couldn't scan for some reason...")
	}
}