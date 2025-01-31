---
title: Image to Text
published: 2019-02-01
updated: 2025-01-31
description: 'A Python tool that extracts text from scanned documents, stores it digitally, and organizes them using a numbering system for easy retrieval.'
image: '/assets/project/img2txt.gif'
tags: [Python, OpenCV]
category: 'Projects'
draft: false 
---

I enjoy the transition to a paperless world, as I find it much easier to organize documents digitally. However, since many documents are still required as hard copies, one is forced to archive them. A tough question then is: How many and which categories of organizers will one need for all documents?

For me, I decided that I do not want any categories and each organizer should be used until it is full.

To be able to find documents, I wrote a Python program that extracts text from scanned documents and stores it in a computer-processable way.

Additionally, each document is stamped with a numbering stamp (which automatically increases its number with each stamping) and the computer-processable data is stored in folders named by the number of the document. So whenever I am looking for a certain document, I type in keywords from the document and the computer provides me with the number of the document and a preview of it. Then I can grab the organizer, which has the number range written on it, and take the document from it.

::github{repo="Jerey/image-to-pdf-and-txt"}
