---
title: Image to Text
publishDate: 2019-12-01 00:00:00
img: /assets/project/img2txt.gif
img_alt: A bright pink sheet of paper used to wrap flowers curves in front of rich blue background
description: |
  Tool to extract the text of an image to make documents searchable.
tags:
  - Python 3
  - PyOcr
  - Img2pdf
  - Opencv_python
  - Tesseract
---
## Python Picture-to-Text

I enjoy the thrive to the paperless world, as I find it much easier to organize documents digitally.
But since many documents are still required as a hardcopy, one is forced to archive those.
A tough question then is: How many and which categories of organizers will one need for all documents?

For me, I decided that I do not want any categories and each organizer should be used until it is full.

To be able to find documents, I wrote a python program which extracts the text from the scanned documents and stores it in a computer processable way.

Additionally each document is stamped with a numbering stamp (which automatically increases its number with each stamping) and the computer processable data is stored in folders named by the number of the document. So whenever I am looking for a certain document, I type in keywords from the document and the computer will provide me with the number of the document and a preview of it. Then I can grab the organizer, which has the number range written on it, and take the document from it.

For a more detailed view, see [the repository](https://github.com/jerey/image-to-pdf-and-txt).
