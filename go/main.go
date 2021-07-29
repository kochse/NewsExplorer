package main

import (
	"encoding/json"
	"fmt"
	"github.com/gocolly/colly"
	"io/ioutil"
	"log"
	"strings"
)

type Headline struct {
	Href        string `json:"href"`
	Description string `json:"description"`
}

func main() {
	allHeadlines := make([]Headline, 0)

	collector := colly.NewCollector(
		colly.AllowedDomains("orf.at", "www.orf.at"),
	)

	collector.OnHTML(".ticker-story-headline a", func(element *colly.HTMLElement) {
		headlineHref := element.Attr("href")

		headlineDesc := strings.TrimSpace(element.Text)

		headline := Headline{
			Href:        headlineHref,
			Description: headlineDesc,
		}

		allHeadlines = append(allHeadlines, headline)
	})

	collector.OnRequest(func(request *colly.Request) {
		fmt.Println("Visiting: ", request.URL.String())
	})

	collector.Visit("https://orf.at/")

	writeJSON(allHeadlines)
}

func writeJSON(data []Headline) {
	file, err := json.MarshalIndent(data, "", " ")
	if err != nil {
		log.Println("Unable to create JSON file")
		return
	}

	_ = ioutil.WriteFile("orf.json", file, 0644)
}
