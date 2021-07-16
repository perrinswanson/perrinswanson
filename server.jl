using Genie, Genie.Router, Genie.Renderer, Genie.Renderer.Html

base = path"layouts/base.jl.html"

route("/") do
    html(path"views/index.jl.html", layout=base, pagetitle="Perrin Swanson")
end

up(8080, async = false)