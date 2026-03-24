const apiKey = "EUCOc4xtETrXUUSVwN7Lz4cJzg3EQngBR9oswJRJbSCkvbniPp63M1rg"

const searchInput = document.getElementById("searchInput")
const photosContainer = document.getElementById("photosContainer")

const getPhotos = async () => {
  try {
    const rawData = await fetch(
      `https://api.pexels.com/v1/search?query=${searchInput.value}`,
      {
        headers: {
          "Authorization": apiKey
        }
      }
    )

    const data = await rawData.json()

    console.log(data.photos)

    photosContainer.innerHTML = ""

    data.photos.forEach(photo => {
      generateCard(photo)
    })
  } catch (error) {
    console.log(error)
  }
}

const generateCard = (photo) => {
  const col = document.createElement("div")
  col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3")

  const card = document.createElement("div")
  card.classList.add("card", "h-100", "shadow-sm")

  const img = document.createElement("img")
  img.src = photo.src.medium
  img.classList.add("card-img-top")
  img.alt = photo.photographer

  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")

  const title = document.createElement("h5")
  title.classList.add("card-title")
  title.innerText = photo.photographer

  const text = document.createElement("p")
  text.classList.add("card-text", "text-muted")
  text.innerText = `Photo ID: ${photo.id}`

  cardBody.appendChild(title)
  cardBody.appendChild(text)

  card.appendChild(img)
  card.appendChild(cardBody)

  col.appendChild(card)

  photosContainer.appendChild(col)
}