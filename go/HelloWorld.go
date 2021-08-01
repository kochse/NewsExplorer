package p

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/aymerick/raymond"

	"github.com/gocolly/colly"
)

func HelloWorld(w http.ResponseWriter, r *http.Request) {

	allHeadlines := make([]map[string]string, 0)

	collector := colly.NewCollector(
		colly.AllowedDomains("orf.at", "www.orf.at"),
	)

	collector.OnHTML(".ticker-story-headline a", func(element *colly.HTMLElement) {
		headlineHref := element.Attr("href")

		headlineDesc := strings.TrimSpace(element.Text)

		headline := map[string]string{
			"Href":        headlineHref,
			"Description": headlineDesc,
		}

		allHeadlines = append(allHeadlines, headline)
	})

	collector.OnRequest(func(request *colly.Request) {
		//fmt.Println("Visiting: ", request.URL.String())
	})

	collector.Visit("https://orf.at/")

	//w.Header().Set("Content-Type", "application/json")
	//json.NewEncoder(w).Encode(allHeadlines)

	t, err := raymond.ParseFile("serverless_function_source_code/home.html")
	if err != nil {
		fmt.Println(err)
	}

	ctx := map[string]interface{}{
		"source": "ORF News",
		"items":  allHeadlines,
	}

	result, err := t.Exec(ctx)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, result)

}
