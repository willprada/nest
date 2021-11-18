import re
from html.parser import HTMLParser

import requests
import tldextract


class TagFilter(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.__anchors = []
        self.__metas = []
        self.__links = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.__anchors.append(attrs)
        elif tag == 'meta': 
            self.__metas.append(attrs)
        elif tag == 'link':
            self.__links.append(attrs)

    def handle_startendtag(self, tag, attrs):
        if tag == 'meta':
            self.__metas.append(attrs)
        elif tag == 'link':
            self.__links.append(attrs)

    @property
    def anchors(self):
        return tuple(self.__anchors)

    @property
    def metas(self):
        return tuple(self.__metas)

    @property
    def links(self):
        return tuple(self.__links)


def isolate_domain(data):
    result = tldextract.extract(data)

    if result.suffix != "":
        prefix = 'https://www.' if data.startswith('https') else 'http://www.'
        return prefix + result.domain + '.' + result.suffix
    else:
        return None


def filter_urls(data):
    ...


if __name__ == '__main__':
    r = requests.get('https://www.bbva.com.co/')
    tfilter = TagFilter()
    tfilter.feed(r.text)

    url_pattern = '[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._]{2,256}\.[a-z]{2,6}'
    anchors = map(dict, tfilter.anchors)
    urls = [
        re.search(url_pattern, a['href']).group(0) for a in anchors \
        if 'href' in a and re.search(url_pattern, a['href'])
    ]

    urls = map(isolate_domain, urls)
    urls = filter(lambda u: u, urls)

    for url in urls:
        result = tldextract.extract(url)
        print(result, end=' - ')
        print(url)

    r = requests.get('http://onelink.me')
    print(r.status_code)
    print(r.history)
    print(r.url)