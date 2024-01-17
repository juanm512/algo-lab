export async function solveWithDijkstra(start, finish, graph, edges) {
  let current = start;
  graph[current].w = 0;

  while (!graph[finish].visited) {
    const edgesWithCurrent = edges.filter(
      (edge) =>
        !edge.removed &&
        (edge.n1 == current || edge.n2 == current) &&
        !graph[edge.n1 == current ? edge.n2 : edge.n1].visited,
    );
    edgesWithCurrent.forEach((edge) => {
      const calc1 = graph[current].w + edge.d;
      const nextPointIndex = edge.n1 == current ? edge.n2 : edge.n1;
      if (calc1 < graph[nextPointIndex].w) {
        graph[nextPointIndex].w = calc1;
        graph[nextPointIndex].prev = current;
      }
    });

    current = Object.entries(graph)
      .toSorted((a, b) => a[1].w - b[1].w)
      .filter((p) => !p[1].visited)[0][0];

    graph[current].visited = true;
  }
  const solutionEdges = [];
  let id = finish;
  while (id != start) {
    const nextId = graph[id].prev;
    if (!nextId) break;

    solutionEdges.unshift(
      edges.find(
        (edge) =>
          (edge.n1 == id && edge.n2 == nextId) ||
          (edge.n2 == id && edge.n1 == nextId),
      ),
    );
    id = nextId;
  }
  return solutionEdges;
}
