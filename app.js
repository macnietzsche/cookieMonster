let successors = (root, m, weaknesses = "") => {
  let connectedCells = [
    [root[0] - 1, root[1]],
    [root[0], root[1] - 1],
    [root[0] + 1, root[1]],
    [root[0], root[1] + 1],
  ];

  const validCells = connectedCells.filter(
    (cell) =>
      cell[0] >= 0 &&
      cell[0] < m.length &&
      cell[1] >= 0 &&
      cell[1] < m[0].length
  );

  const noWeaknesses = validCells.filter(
    (cell) => !weaknesses.includes(m[cell[0]][cell[1]])
  );

  const isNotBlocked = noWeaknesses.some(
    (cell) => cell[0] > root[0] || cell[1] > root[1]
  );

  if (Array.isArray(noWeaknesses) && noWeaknesses.length > 0 && isNotBlocked) {
    return noWeaknesses;
  }

  return validCells;
};

const buildPath = (traversalTree, to) => {
  let path = [to];
  let parent = traversalTree[to];
  while (parent) {
    path.push(parent);
    parent = traversalTree[parent];
  }
  return path.reverse();
};

const bfs = (m, weaknesses, from, to) => {
  let traversalTree = [];
  let visited = new Set();
  let queue = [];
  queue.push(from);

  while (queue.length) {
    let subtreeRoot = queue.shift();
    visited.add(subtreeRoot.toString());

    if (subtreeRoot.toString() == to.toString())
      return buildPath(traversalTree, to);

    const test = successors(subtreeRoot, m, weaknesses);
    for (child of test) {
      if (!visited.has(child.toString())) {
        traversalTree[child] = subtreeRoot;
        queue.push(child);
      }
    }
  }
};
const getSequence = (arr, indexes) => {
  return indexes.map((index) => arr[index[0]][index[1]]);
};

const getWeigths = (sequence, weaknesses) => {
  return sequence.reduce((acc, el, index) => {
    if (index === 0) {
      return acc + 0;
    }

    if ("MY.".includes(el)) {
      return acc + 1;
    } else if (!weaknesses.includes(el)) {
      return acc + 2;
    } else if (weaknesses.includes(el)) {
      return acc + 5;
    } else {
      return acc + 0;
    }
  }, 0);
};

function timeToEscape(weaknesses, grid) {
  const from = [0, 0];
  const to = [grid.length - 1, grid[0].length - 1];

  const path = bfs(grid, weaknesses, from, to);
  const sequence = getSequence(grid, path);

  return getWeigths(sequence, weaknesses);
}

const a = [
  ["M", "D", "C", ".", "C"],
  [".", ".", "C", "F", "F"],
  ["G", "G", "G", "B", "E"],
  ["E", "G", ".", "G", "."],
  ["E", "G", "D", "E", "Y"],
];
const weaknesses = "CG";

console.log(timeToEscape(weaknesses, a));
